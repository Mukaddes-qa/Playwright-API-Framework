export class SchemaValidator {

  static validate(
    data: any,
    schema: any,
    path = ''
  ) {

    for (const key in schema) {

      const currentPath = path
        ? `${path}.${key}`
        : key;


      if (typeof schema[key] === 'object') {

        this.validate(
          data[key],
          schema[key],
          currentPath
        );

      } else {

        const expectedType = schema[key];

        const actualType = typeof data[key];


        if (actualType !== expectedType) {

          throw new Error(
            `Schema validation failed at ${currentPath}. Expected ${expectedType}, got ${actualType}`
          );

        }

      }

    }

  }

}

