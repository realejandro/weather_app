import { rejects } from 'node:assert';
import fs from 'node:fs';
import path, { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// TODO: Define a City class with name and id properties
// TODO: Complete the HistoryService class
interface City {
  name: string,
  id: string,
}

class HistoryService {
  
  //private filePath: string; // TODO: Define a read method that reads from the searchHistory.json file -> // private async read() {}
  private async read() : Promise<string> {
    return new Promise( (resolve, rejects) => {
      fs.readFile('searchHistory.json', 'utf-8', (error, data) => {
        if (error) {
          console.log(error);
          rejects(error);
        } else {
          resolve(data);
        }
      })
    })
  }

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file // private async write(cities: City[]) {}
  private async write(cities: City[]) {
    fs.writeFile('searchHistory.json', JSON.stringify(cities) , (err) =>
      err ? console.error(err) : console.log('Success!')
    );
  }

  /*
  const data = cities.map( ( { name, id } : City ) => {
      return { 
        id,
        name,
      }
    })
  */
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    const jsonData = await this.read();
    return JSON.parse(jsonData);
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

    //const arr : any[] = [{
     // name:"new york",
      //id: "1"
    //}];
    const jsonData = await this.read();

    //console.log(typeof JSON.parse(jsonData));    

  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
     const jsonData = await this.read();
     const cities : City[] = JSON.parse(jsonData);
     const newCity: City = { name:city, id: (cities.length+1).toString() }
     cities.push(newCity);
     this.write(cities);
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
}

export default new HistoryService();
