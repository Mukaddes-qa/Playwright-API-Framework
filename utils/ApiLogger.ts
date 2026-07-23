export class ApiLogger {

  static logRequest(
    method: string,
    url: string,
    body?: unknown
  ) {

    console.log('\n========== API REQUEST ==========');

    console.log('METHOD:', method);
    console.log('URL:', url);

    if (body) {

      console.log(
        'BODY:',
        JSON.stringify(body, null, 2)
      );

    }

  }


  static async logResponse(
    response: any
  ) {

    const status = response.status();

    console.log('\n========== API RESPONSE ==========');

    console.log('STATUS:', status);


    try {

      const body = await response.json();


      // Successful response
      if (status >= 200 && status < 300) {


        if (Array.isArray(body)) {

          console.log(
            'BODY:',
            `Array response (${body.length} items)`
          );


        } else {

          console.log(
            'BODY:',
            JSON.stringify(body, null, 2)
          );

        }


      } 
      // Error response
      else {

        console.log(
          'ERROR BODY:',
          JSON.stringify(body, null, 2)
        );

      }


    } catch {

      console.log(
        'No JSON response'
      );

    }


    console.log(
      '=================================='
    );

  }

}
