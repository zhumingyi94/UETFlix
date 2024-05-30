from flask import Flask, request, jsonify
from pyspark.sql import SparkSession
from pyspark.ml.recommendation import ALSModel
from pyspark.sql.functions import col, lit

# Initialize Spark session
spark = SparkSession.builder \
    .appName("Movie Recommendation API") \
    .getOrCreate()

# Load the saved ALS model
loaded_model = ALSModel.load("/home/nhatdm2k4/Documents/BigDataProject/ALS_model")

# Load all_movies.csv into a DataFrame
all_movies = spark.read.csv("all_movies.csv", header=True, inferSchema=True)

# Define Flask app
app = Flask(__name__)

# Define API endpoint for recommendations
@app.route('/recommendations', methods=['GET'])
def recommendations():
    # Get user_id from request parameters
    user_id = request.args.get('user_id')

    # Check if user_id is provided
    if not user_id:
        return jsonify({'error': 'Please provide a user_id'})

    # Make predictions for all movies for the specified user
    user_movie_predictions = loaded_model.transform(all_movies.select("Movie_ID").distinct().withColumn("User_Id", lit(int(user_id))))

    # Sort the predictions by predicted rating in descending order and limit to top 4
    sorted_predictions = user_movie_predictions.orderBy("prediction", ascending=False).limit(4)

    # Extract Movie_Name and Movie_ID columns
    recommendations = sorted_predictions.select("Movie_Name", "Movie_ID").collect()

    # Convert recommendations to a list of dictionaries
    recommendations_list = [{'Movie_Name': row['Movie_Name'], 'Movie_ID': row['Movie_ID']} for row in recommendations]

    # Return recommendations as JSON response
    return jsonify(recommendations_list)

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)