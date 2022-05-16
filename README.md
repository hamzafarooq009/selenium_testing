# selenium_testing

Run the following command to start the selenium script

```node selenium.js```

There are three events type added in the JSON file `config.json`

- Click -> to click any button or specific xpath
- Input -> to input values in input_fields
- Compare -> to check if the specific html string present in the page source

## Compare event
In `config.json` file, after redirecting to a specific page, replace the `html` in the `compare` with the one you want to check.

Expected output based on whether the html present or not
> True or False
