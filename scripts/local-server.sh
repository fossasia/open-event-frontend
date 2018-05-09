git clone -b development https://github.com/fossasia/open-event-server.git
cd open-event-server
sudo -H pip install -r requirements.txt
sudo apt-get install python-dev
sudo apt-get install libpq-dev
sudo apt-get install libffi6 libffi-dev
psql -U postgres postgres -c "CREATE USER john WITH PASSWORD 'start';"
psql -U postgres postgres -c "CREATE DATABASE oevent WITH OWNER john;"
cp .env.example .env
sudo service postgresql restart
sudo apt-get install expect

expect ../scripts/create.expect
python manage.py db stamp head
python manage.py runserver &
export API_HOST="http://localhost:5000"
