const { validateLogin } = require('../js/login');
const Swal = require('sweetalert2');
// Mock de los elementos DOM que se utilizan
jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}));

describe('validateLogin', () => {
    let mockFetch;

    beforeEach(() => {
        mockFetch = jest.fn();
        global.fetch = mockFetch;
        document.body.innerHTML = `
            <input placeholder="Username" value="testuser" />
            <input placeholder="Password" value="password123" />
            <div class="loading"></div>
        `;
        sessionStorage.clear();
    });

    test('debería realizar una solicitud fetch y almacenar datos en sessionStorage al hacer login correctamente', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({
                username: 'testuser',
                id: '123',
                authProvider: 'basic',
            }),
        });

        await validateLogin({ preventDefault: jest.fn() });

        expect(mockFetch).toHaveBeenCalledWith('http://20.3.4.249/api/users/me', expect.objectContaining({
            method: 'GET',
            headers: expect.objectContaining({
                'Authorization': 'Basic dGVzdHVzZXI6cGFzc3dvcmQxMjM=', // codificado base64
                'Content-Type': 'application/json'
            })
        }));

        expect(sessionStorage.getItem('username')).toBe(null);
        expect(sessionStorage.getItem('userId')).toBe(null);
        
    });

    test('debería mostrar un mensaje de error si la autenticación falla', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
        });

        await validateLogin({ preventDefault: jest.fn() });

        expect(require('sweetalert2').fire).toHaveBeenCalledWith(expect.objectContaining({
            title: "Error",
            text: "Failed to log in. Please verify your credentials.",
        }));
    });
});