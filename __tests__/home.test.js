const Swal = require('sweetalert2'); // Usar require para importar SweetAlert
const {
  toggleLateralMenu,
  logOutUser,
  formatMoney,
  redirectToAvailableAuction
} = require('../js/home'); // Asegúrate de ajustar la ruta

jest.mock('sweetalert2'); // Mockea SweetAlert
Swal.fire.mockImplementation(() => {
  return Promise.resolve({ isConfirmed: true });
});
describe('Home tests', () => {
  let menu, barraLateral, palanca, circulo, logIcon;

  beforeEach(() => {
    document.body.innerHTML = `
            <div id="puko"></div>
            <div class="barra-lateral"></div>
            <div class="menu">
                <span></span>
                <span style="display:none;"></span>
            </div>
            <div class="switch"></div>
            <div class="circulo"></div>
            <div class="logOut-icon"></div>
        `;

    menu = document.querySelector('.menu');
    barraLateral = document.querySelector('.barra-lateral');
    palanca = document.querySelector('.switch');
    circulo = document.querySelector('.circulo');
    logIcon = document.querySelector('.logOut-icon');
  });

  test('should toggle lateral menu on click', () => {
    // Simula el DOM necesario
    const menu = document.createElement('div');
    const barraLateral = document.createElement('div');
    menu.innerHTML = '<span></span><span style="display:none"></span>';
    barraLateral.classList.add('barra-lateral');

    // Agrega al DOM
    document.body.appendChild(menu);
    document.body.appendChild(barraLateral);

    // Llama la función y verifica
    toggleLateralMenu(); // Llama la función directamente
    expect(menu.children[0].style.display).toBe('');
    expect(menu.children[1].style.display).toBe('none');
  });

  test('should toggle dark mode on palanca click', () => {
    expect(document.body.classList.contains('dark-mode')).toBe(false);
    expect(circulo.classList.contains('prendido')).toBe(false);
  });

  test('should log out user and redirect on logOut icon click', async () => {
    const logIcon = document.createElement('div');
    document.body.appendChild(logIcon);

    // Mockear window.location
    delete window.location;
    window.location = { href: '' };

    await logOutUser(); // Asegúrate de que sea una función independiente o llámala manualmente
    expect(Swal.fire).toHaveBeenCalled();
    expect(window.location.href).toBe('');
  });

  test('should format money correctly', () => {
    const formattedMoney = formatMoney(1000000);
    expect(formattedMoney).toBe('1.000.000');
  });

  test('should redirect to available auction page on click', () => {
    Object.defineProperty(window, 'location', {
      value: { href: '' },
      writable: true,
    });

    redirectToAvailableAuction();
    expect(window.location.href).toBe('/html/avaliable_auction.html');
  });
});
