export class CustomerEntity {
  id: string;
  name: string;
  cpf: string;
  email: string;
  address: string;

  constructor(
    id: string,
    name: string,
    cpf: string,
    email: string,
    address: string,
  ) {
    this.id = id;
    this.name = name;
    this.cpf = cpf;
    this.email = email;
    this.address = address;
  }
}
