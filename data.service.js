/** @private */
const DATA_KEY = 'data';

class DataService {

    /**
     * 
     * @returns {Promise<Array>}
     */

    static getData = () => {
        const promise = toPromise((resolve, reject) => {
            chrome.storage.local.get([DATA_KEY], (result) => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                }
                const resulted_data = result.data ?? [];
                resolve(resulted_data);
            });
        });

        return promise;
    }

    static addData = async (item_id, item_name, item_value) => {
        const data = await this.getData();
        const updatedData = [...data, {item_id, item_name, item_value}];

        const promise = toPromise((resolve, reject) => {
            chrome.storage.local.set({ [DATA_KEY]: updatedData }, () => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                }
                
                resolve(updatedData);
            });
        });

        console.log(updatedData);
        return promise;
    }

    static deleteData = async (item_id_to_delete) => {
        const data = await this.getData();

        const updatedData = await this.removeItemFromList(item_id_to_delete, data);
        
        const promise = toPromise((resolve, reject) => {
            chrome.storage.local.set({ [DATA_KEY]: updatedData }, () => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                }
                
                resolve(updatedData);
            });
        });

        return promise;
    }

    static removeItemFromList = async (item_id_to_delete, original) => {
        var updatedData = [];
        var j = 0;
        for (var i = original.length - 1; i >= 0; i--) {
            var item = original[i];
            if (item.item_id != item_id_to_delete && item.item_id !== item_id_to_delete) {
                updatedData[j++] = item;              
            }
        }
    
        return updatedData;
    }
}


/**
 * Promisify a callback.
 * @param {Function} callback 
 * @returns {Promise}
 */
 const toPromise = (callback) => {
    const promise = new Promise((resolve, reject) => {
        try {
            callback(resolve, reject);
        }
        catch (err) {
            reject(err);
        }
    });
    return promise;
}