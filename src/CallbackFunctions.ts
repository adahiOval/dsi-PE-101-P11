import net from 'net';
import fs from 'fs';
import path from 'path';

export interface Card {
    type: string,
    color: string,
    name: string
}

export const writeCard = (user: string, card: Card, callback: (err: string | undefined, data: string | undefined) => void) => {
    
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const route = path.join(__dirname, `database/users/${user}/${card.name}.json`);

    fs.writeFile(route, JSON.stringify(card), (err) => {
        if (err) {
            callback(`Error al escribir la colección.`, undefined);
        } else {
            callback(undefined, `Escritura realizada correctamente.`);
        }
    });
}

export const readCard = (user: string, card: string, callback: (err: string | undefined, collection: Card | undefined) => void) => {
    
    
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const route = path.join(__dirname, `database/users/${user}/${card}`);

    fs.readFile(route,'utf-8', (err, data) => {
        if(err) {
            callback("Error al leer la carta.", undefined);
        } else {
            const content: Card = JSON.parse(data);
            callback(undefined, content);
        }
    })
  }