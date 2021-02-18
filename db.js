const Sequelize = require('sequelize');

// acá creamos la conexión a la Base de Datos
const sql = new Sequelize('dojo', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});


const Dojo = sql.define('Dojo', {
  nombre: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "nombre is required"    // algunas validaciones solo requieren un mensaje
      },
      len: {
        args: [2],    // algunas validaciones necesitan argumentos
        msg: "nombre debe tener al menos 2 caracteres de LARGO. Como Minimo."
      },
      isEven(value) {
        if (value == "") {
          throw new Error('No puede ser vacio!');
        }
      }
    }
  }
}, { timestamps: true });

const Ninja = sql.define('Ninja', {
  nombre: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "nombre is required"    // algunas validaciones solo requieren un mensaje
      },
      len: {
        args: [2],    // algunas validaciones necesitan argumentos
        msg: "nombre must be at least 2 characters long"
      }
    }
  }
}, { timestamps: true });



//  después sincronizamos nuestro código con la base de datos
sql.sync()
  .then(() => {
    console.log('Tablas creadas');
  });


  Dojo.hasMany(Ninja);
  Ninja.belongsTo(Dojo);


// finalmente acá listamos todos los modelos que queremos exportar
module.exports = {
  Dojo, Ninja
};

