
const fs = require("fs");

class Contenedor {
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
    this.productos = [];
  }

  async obtenerProducts() {
    try {
      const data = await fs.promises.readFile(this.nombreArchivo, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return this.productos;
    }
  }

  async save(product) {
    this.productos = await this.obtenerProducts();
    const producto = {
      id: this.productos.length + 1,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    };

    this.productos.push(producto);
    try {
      fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.productos));
      console.log(producto.id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(productId) {
    this.productos = await this.obtenerProducts();
    const index = this.productos.findIndex((prod) => prod.id == productId);
    if (index == -1) {
      console.log("El producto no existe");
    } else {
      console.log(this.productos[index]);
    }
  }

  async getAll() {
    this.productos = await this.obtenerProducts();
    console.log(this.productos);
  }

  async deleteById(productId) {
    this.productos = await this.obtenerProducts();
    const index = this.productos.findIndex((prod) => prod.id == productId);
    if (index != -1) {
      const producto = this.productos[index];
      this.productos.splice(index, 1);
      try {
        fs.writeFileSync(this.nombreArchivo, JSON.stringify(this.productos));
        console.log(
          `El producto: ${producto.title} con Id: ${producto.id}, se elimino correctamente.`
        );
      } catch (error) {
        throw new Error(error);
      }
    } else {
      console.log("No existe un producto con ese Id");
    }
  }

  async deleteAll() {
    try {
      fs.unlinkSync(`./${this.nombreArchivo}`);
    } catch (error) {
      console.log(error);
    }
  }
}

const product = {
  price: "$15000",
  title: "Buzo",
  thumbnail: "foto de Buzo",
};

const productos = new Contenedor("manejoDeArchivos.json");
productos.save(product);


