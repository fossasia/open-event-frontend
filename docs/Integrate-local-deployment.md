#### Follow given steps to locally integrate deployment of open-event-frontend and open-event-server

- Deploy open-event-server locally with `python manage.py runserver` or `gunicorn app:app --worker-class eventlet -w 1 --bind 0.0.0.0:5000 --reload
`

- Open config/environment.js in open-event-frontend root directory and put `http://localhost:5000` in place of `https://open-event.dokku.fossasia.org` in apiHost

- Keeping open-event-server running in first step, run open-event-frontend in another terminal or command prompt with `ember serve`

- Your integrated open-event-frontend with open-event-server is running on `http://localhost:4200`
