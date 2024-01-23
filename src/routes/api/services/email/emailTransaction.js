export const emailTransaction = (date,lang, name, phone, email, message, treatment) => {
 if(!email) email="-";
 if(!message) message="-";
 if(!treatment) treatment="-";
  return `
  <h2>Yeni Satış Kaydı <h2>
    <table>
    <thead>
      <tr>
      <td  style="padding-left: 20px;"><strong>Tarih</strong></td>
      <td  style="padding-left: 20px;"><strong>Dil</strong></td>
      <td  style="padding-left: 20px;"><strong>İsmi</strong></td>
      <td  style="padding-left: 20px;"><strong>Telefon</strong></td>
      <td  style="padding-left: 20px;"><strong>E-mail</strong></td>
      <td  style="padding-left: 20px;"><strong>Message</strong></td>

    </thead>
    <tbody>
      <tr>
      <td  style="padding-left: 20px;">${date}</td>
      <td  style="padding-left: 20px;">${lang}</td>
      <td  style="padding-left: 20px;">${name}</td>
      <td  style="padding-left: 20px;">${phone}</td>
      <td  style="padding-left: 20px;">${email}</td>
      <td  style="padding-left: 20px;">${message}</td>
       
      </tr>
    </tbody>
  </table>
  `
}
console.log()
export default emailTransaction