/**
 *
 * @param amount Combien
 * @param currency devise telle que 'EUR' ou 'USD'
 */
export default function formatMoney(amount:number, currency='EUR'){
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: currency })
        .format(amount);
}