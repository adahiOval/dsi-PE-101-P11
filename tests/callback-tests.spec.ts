import 'mocha';
import {expect} from 'chai';
import {writeCard, readCard, Card} from '../src/CallbackFunctions.js'

describe('Callback write and read Tests', () => {

  const card1: Card = {
    type: "land",
    color: "green",
    name: "The Greenery"
  }

  const card2: Card = {
    type: "planeswalker",
    color: "red",
    name: "The Red Boy"
  }

  const expectedCard1: Card = {
    type: "land",
    color: "blue",
    name: "The Great Tester"
  }

  it("Read funciona correctamente, debería leer con éxito", (done) => {
    readCard('adahi','testCard.json', (_, carta) => {
      if(carta) {
        expect(carta).to.deep.eq(expectedCard1);
        done();
      }
    });
  });

  it("Read debería devoler un string con error si no existe el usuario", (done) => {
    readCard('adahi','nonexistent.json', (err, _) => {
      if(err) {
        expect(err).to.deep.eq("Error al leer la carta.");
        done();
      }
    });
  });

  it("WriteCard funciona correctamente, debería escribir con éxito", (done) => {
    writeCard('adahi',card1, (_, success) => {
      if(success) {
        expect(success).to.deep.eq("Escritura realizada correctamente.");
        done();
      }
    });
  });

  it("WriteCard devuelve un string de error si el user no existe", (done) => {
    writeCard('pepito',card1, (err, _) => {
      if(err) {
        expect(err).to.deep.eq("Error al escribir la colección.");
        done();
      }
    });
  });

});