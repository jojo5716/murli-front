export function generateColor() {
    const allowed = 'ABCDEF0123456789';
    let color = '#';

   while (color.length < 7) {
       color += allowed.charAt(Math.floor((Math.random() * 16) + 1));
   }

   return color;
}
