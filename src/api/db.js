import { API, Auth } from 'aws-amplify';
// This function is called immediately when the page loads, before populating the table with this data

export async function getAboutInfo() {
    const data = await API.get('mainAPI', '/info', {})
    return data.message
}
export async function getUserItems() {
    const userData = await Auth.currentAuthenticatedUser()
    const data = await API.get('mainAPI', '/items/' + userData.username, {})

    return data
}

// This function is called when a user clicks the button 'Add'
export async function addItem(itemName) {
    const userData = await Auth.currentAuthenticatedUser()

    const response = await API.post('mainAPI', '/items', {
        body: {
            timestamp: new Date().getTime(),
            user: userData.username,
            itemName
        }
    })

    return response
}

// This function is called when a user deletes an existing item in the table
export async function deleteItem(timestamp) {
    const userData = await Auth.currentAuthenticatedUser()
    const response = await API.del('mainAPI', '/items/object/' + userData.username + '/' + timestamp, {})

    return response
}
