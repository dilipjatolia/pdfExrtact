const { BlobServiceClient } = require('@azure/storage-blob');
const async = require('async');

    exports.blobarr = listAllBlobs();


    async function listAllBlobs() {
       
        // Retrieve the connection string for use with the application. The storage
        // connection string is stored in an environment variable on the machine
        // running the application called AZURE_STORAGE_CONNECTION_STRING. If the
        // environment variable is created after the application is launched in a
        // console or with Visual Studio, the shell or application needs to be closed
        // and reloaded to take the environment variable into account.
        const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
    
        // Create the BlobServiceClient object which will be used to create a container client
        const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    
       
        const containerName = 'finalmtgocontracts';
    
        console.log('\ncontainer name...');
        console.log('\t', containerName);
    
        // Get a reference to a container
        const containerClient = blobServiceClient.getContainerClient(containerName);
    
        let blobarr =[];
        // List the blob(s) in the container.
        for await (const blob of containerClient.listBlobsFlat()) {
            blobarr.push(blob.name)
            // console.log(blobarr);
        }  
        return blobarr;     
    }
