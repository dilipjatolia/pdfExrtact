function computerVision() {
  async.series([
    async function () {
      const computerVisionClient = new ComputerVisionClient(
        new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key, 'Content-Type': 'application/json'} }), endpoint);
      const STATUS_SUCCEEDED = "succeeded";
      const STATUS_FAILED = "failed";
      const mixedMultiPagePDFURL = 'https://adobemacontract.blob.core.windows.net/finalmtgocontracts/Magento/00P1500002Fuk7kEAB.pdf?sp=r&st=2021-07-13T08:50:46Z&se=2021-07-13T16:50:46Z&spr=https&sv=2020-02-10&sr=b&sig=z7KPbGeCYpAMl7vFEHF4Lf37U2KqdtVhA7gI%2BUepSVE%3D';
      //const path = 'https://www.researchgate.net/profile/Dimosthenis-Karatzas/publication/4054893/figure/fig3/AS:339590398398467@1457976068450/A-sample-scanned-document.png';
      // Recognize printed text and handwritten text in a PDF from a URL
      console.log('\nRead printed and handwritten text from a PDF from URL...', mixedMultiPagePDFURL.split('/').pop());
      const mixedPdfResult = await readTextFromURL(computerVisionClient, mixedMultiPagePDFURL);
      printRecText(mixedPdfResult);
      getBlob();
    
      // Perform read and await the result from URL
      async function readTextFromURL(client, url) {
        // To recognize text in a local image, replace client.read() with readTextInStream() as shown:
        let result = await client.read(url);
        // Operation ID is last path segment of operationLocation (a URL)
        let operation = result.operationLocation.split('/').slice(-1)[0];
      
        // Wait for read recognition to complete
        // result.status is initially undefined, since it's the result of read
        while (result.status !== STATUS_SUCCEEDED) { await sleep(1000); result = await client.getReadResult(operation); }
        console.log("Read result :", result.analyzeResult.readResults);
        return result.analyzeResult.readResults; // Return the first page of result. Replace [0] with the desired page if this is a multi-page file such as .pdf or .tiff.
      }
    
      // Prints all text from Read result
      function printRecText(readResults) {
        console.log('Recognized text:');
        for (const page in readResults) {
          if (readResults.length > 1) {
            console.log(`==== Page: ${page}`);
          }
          const result = readResults[page];
          if (result.lines.length) {
            for (const line of result.lines) {
              console.log(line.words.map(w => w.text).join(' '));
            }
          }
          else { console.log('No recognized text.'); }
        }
      }
    },
    function () {
      return new Promise((resolve) => {
        resolve();
      })
    }
    ], (err) => {
      throw (err);
    });
}