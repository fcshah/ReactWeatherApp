import React from "react";
import Title from './Components/Title';
import Form from './Components/Form';
import Weather from './Components/Weather';

const API_KEY = "69384b5176c2a7f1f025b8b8eda792f5";

export default class App extends React.Component {

    state = {

        temprature : undefined,
        city : undefined,
        country : undefined,
        humidity : undefined,
        description : undefined,
        error : undefined
        
    }

    getWeather = async (e) => {

        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        e.preventDefault();
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
        const data = await api_call.json();
                   
        console.log(data);

        if(city && country && data.cod !== "404"){
        this.setState({

            temprature: data.main.temp,
            city: data.name,
            country: data.sys.country,
            humidity: data.main.humidity,
            description: data.weather[0].description,
            error: ""

        });
        }
        else
        {
        this.setState({
        temprature : undefined,
        city : undefined,
        country : undefined,
        humidity : undefined,
        description : undefined,
        error : 'Opps! False or empty input. Please try again..'
        });
   } 
 
}
    render (){

        return (

            <div>
            <div className="wrapper">
              <div className="main">
                <div className="container">
                  <div className="row">
                    <div className="col-xs-5 title-container">
                      <Title />
                    </div>
                    <div className="col-xs-7 form-container">
                      <Form getWeather={this.getWeather} />
                      <Weather 
                        temperature={this.state.temperature} 
                        humidity={this.state.humidity}
                        city={this.state.city}
                        country={this.state.country}
                        description={this.state.description}
                        error={this.state.error}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

    };

}