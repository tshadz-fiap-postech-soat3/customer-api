import axios from 'axios';

describe('Customer API Integration Tests', () => {
  it('should register a new customer', async () => {
    // GIVEN: Dados do novo cliente a serem registrados
    const newCustomer = {
      name: 'Customer-20',
      cpf: '12345678920',
    };

    try {
      // WHEN: Enviar solicitação POST para o endpoint de registro de cliente
      const response = await axios.post(
        'http://localhost:3001/register',
        newCustomer,
      );
      // THEN: Verificar se a solicitação foi bem-sucedida e o cliente foi registrado
      expect(response.status).toBe(201);
    } catch (error) {
      throw new Error(`Failed to register customer: ${error.message}`);
    }
  });
});
