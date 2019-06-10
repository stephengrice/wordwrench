# Word Wrench

[![Build Status](https://travis-ci.com/stephengrice/wordwrench.svg?branch=master)](https://travis-ci.com/stephengrice/wordwrench)
[![Coverage Status](https://coveralls.io/repos/github/stephengrice/wordwrench/badge.svg?branch=master)](https://coveralls.io/github/stephengrice/wordwrench?branch=master)

Welcome to Word Wrench.

Our mission is to build the most effective language-learning platform on the internet, while at the same time keeping the inner-workings transparent and free for all to contribute to.

## Build and Run Locally

Follow these steps to run the server locally, using the source in this repo.

**Requirements:** Python 3.5, pip3, Google Chrome and chromedriver (to run functional tests), Node JS / npm (for QUnit frontend tests)

1. Clone the git repo.

```bash
git clone git@github.com:stephengrice/wordwrench.git
```

2. Install dependencies

```bash
cd wordwrench
pip install -r requirements.txt
```

3. Run tests

```bash
python manage.py test
```

4. Run the local server. Go to localhost:8000 in your web browser to see it in action!

```bash
python manage.py runserver
```

5. Try out the production server (requires Heroku CLI)

```bash
heroku local web
```
