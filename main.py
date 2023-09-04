from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/page")  # This is the URL route for the new page
def page():
    return render_template("page.html")  # This renders the page.html template

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)

