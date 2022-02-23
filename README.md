# Amadeus
PostgreSQL DB needed. 

1. Create python env through
```
python3 -m venv env
```

2. Activate python env
```
source env/bin/activate
```

3. Download dependencies
```
pip install -r requirements.txt
```

4. Append .env file in the backend/api folder. It should have 
```
DATABASE_URL=[your_postgres]
```

5. Run app.py