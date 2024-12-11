import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// TODO: Define a City class with name and id properties
// TODO: Complete the HistoryService class
interface City {
  name: string,
  id: string,
}

class HistoryService {
  
  //private filePath: string; // TODO: Define a read method that reads from the searchHistory.json file -> // private async read() {}
  private async read() {
    fs.readFile('searchHistory.json', 'utf-8', (error, data) => {
      // or if else statement returning data
      return error ? console.error(error) : data;
    })
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file // private async write(cities: City[]) {}
  private async write(cities: City[]) {
    const data = cities.map( ( { name, id } : City ) => {
      return { 
        id,
        name,
      }
    })
    fs.writeFile('searchHistory.json', JSON.stringify(data) , (err) =>
      err ? console.error(err) : console.log('Success!')
    );
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    const arr : any[] = [{
      name:"new york",
      id: "1"
    }];
    this.read().then( data =>{ 
      arr.push(data) 
      console.log(arr);
    });
    
    
  }

  async test() {

    this.write([{
      name:"new york",
      id: "1"
    },{
      name:"Chicago",
      id: "2"
    },{
      name:"Los Angeles",
      id: "3"
    }])

    this.read();

  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}
  async addCity(city: string) {
    
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
}

export default new HistoryService();
