import axios from 'axios';
import { IPlaceID } from '../types/GooglePlaceIDTypes';

class GooglePlaceID {
    #apiKey: string;
    #endpoint: string;
    #parameters : {
        input: string,
        inputtype: string,
        fields: string,
    };
    #method: string;
    #headers: object = {};

    constructor(apiKey: string) { 
        this.#apiKey = apiKey;
        this.#endpoint = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json'
        this.#parameters = {
            input: '',
            inputtype: 'textquery',
            fields: 'place_id',
        };
        this.#method = 'get';
    }

    public getPlaceID = async (address: string): Promise<IPlaceID | null> => {
        this.#parameters.input = address;
        let url: string = this.#endpoint + '?key=' + this.#apiKey;
        for (const [key, value] of Object.entries(this.#parameters)) {
            url = url + '&' + key + '=' + encodeURIComponent(value);
        }

        const response = await axios({
            method: this.#method,
            url: url,
            headers: this.#headers,
        })
        
        if (response.data.error_message) {
            console.log(response.data.error_message);
            return null;
        }

        const placeID: IPlaceID = {
            address: address,
            place_id: response.data.candidates[0].place_id,
        }

        return new Promise((resolve, reject) => {
            if (placeID) { resolve(placeID); }
            else { reject(null); }
        });
    }
}

export default GooglePlaceID;