This application is built using React and Redux. The main purpose of the website is to allow a visitor to explore the Star Wars universe beginning the first Star Wars movie. This exploration functionality is provided through clicking links which which retrieve data from thw Star Wars API (SWAPI) and populate the various links on the site.

The Redux store uses three reducers: Films, Planets, and People which represent the three states that are managed by each respective reducer. The application uses the redux-persist library to sync the Redux store with localStorage.

The application does a great job regarding component reusability and the basic component diagram looks something like below:

Provider
    PersistGate
        App
            BrowserRouter
                NavBar
                Routes
                    Home Page
                    FilmList
                        ItemList
                    Film
                        Sublist
                    PlanetsList
                        ItemList
                    Planets
                        Sublist
                    PersonList
                        ItemList
                    Person
                        Sublist