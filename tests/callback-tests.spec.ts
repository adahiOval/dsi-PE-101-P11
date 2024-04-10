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

  describe('ReadCard Tests', () => {

    it("Read funciona correctamente, debería leer con éxito", (done) => {
      readCard('adahi','testCard.json', (_, carta) => {
        if(carta) {
          expect(carta).to.deep.eq(expectedCard1);
          done();
        }
      });
    });
  
    it("Read funciona correctamente, debería leer con éxito again", (done) => {
      readCard('adahi','The Greenery.json', (_, carta) => {
        if(carta) {
          expect(carta).to.deep.eq(card1);
          done();
        }
      });
    });
  
    it("Read debería devolver un string con error si no existe la carta", (done) => {
      readCard('adahi','nonexistent.json', (err, _) => {
        if(err) {
          expect(err).to.deep.eq("Error al leer la carta.");
          done();
        }
      });
    });
  
    it("Read debería devolver un string con error si no existe el usuario", (done) => {
      readCard('pepito','testCard.json', (err, _) => {
        if(err) {
          expect(err).to.deep.eq("Error al leer la carta.");
          done();
        }
      });
    });
  });

  describe('WriteCard Tests', () => {
    
    it("WriteCard funciona correctamente, debería escribir con éxito", (done) => {
      writeCard('adahi',card1, (_, success) => {
        if(success) {
          expect(success).to.deep.eq("Escritura realizada correctamente.");
          done();
        }
      });
    });
    
    it("WriteCard funciona correctamente, debería escribir con éxito otra vez", (done) => {
      writeCard('adahi',card2, (_, success) => {
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
  
    it("WriteCard devuelve un string de error si no existe el usuario", (done) => {
      writeCard('panchito',card1, (err, _) => {
        if(err) {
          expect(err).to.deep.eq("Error al escribir la colección.");
          done();
        }
      });
    });
  });

});