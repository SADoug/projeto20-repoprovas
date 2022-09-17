- TL;DR: Configurar o Jest + TypeScript
    - Instalar as dependencias:
        
        ```bash
        npm i -D jest ts-jest typescript @types/jest
        ```
        
    - Criar um arquivo de configuração do Jest na raiz do projeto: `jest.config.js`
        
        ```jsx
        /** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
        export default {
          preset: "ts-jest",
          testEnvironment: "node",
          extensionsToTreatAsEsm: [".ts"],
          globals: {
            "ts-jest": {
              useESM: true,
            },
          },
          moduleNameMapper: {
            "^(\\.{1,2}/.*)\\.js$": "$1",
          },
        };
        ```
        
    - Criar o script de testes no `package.json`:
        
        ```json
        "scripts": {
            "test": "NODE_OPTIONS=--experimental-vm-modules jest"
         }
        ```
        
    - (Caso WINDOWS) Instale o pacote cross-env e insira-o no comando do script de testes.
        
        ```json
        "scripts": {
            "test": "cross-env NODE_OPTIONS=--experimental-vm-modules jest"
         }
        ```
        
    
    - Agora podemos criar um diretório `tests` onde iremos criar nossos arquivos de testes

- Ex: 
  ```json
  import { statusCodes, sumAllTotal, sumTwoNumbers } from '../src/app';

      describe('Testa o meu app', () => {
      it('Testa a função sumTwoNumber', () => {
      const result = sumTwoNumbers(2, 2);

      expect(result).toEqual(4);
  });

  it('Testa a função statusCodes retornando 200 de status', () => {
    const result = statusCodes(true);

    expect(result.status).toBe(200);
  });

  it('Testa a função statusCodes retornando 404 de status', () => {
    const result = statusCodes(false);

    expect(result.status).toBe(404);
  });

  it('Testa a função sumAllTotal', () => {
    const arr = [{ total: 2 }, { total: 10 }];

    const result = sumAllTotal(arr);

    expect(result).toBe(12);
  });
  }); 
  ```
  