import ReactMarkdown from "react-markdown";

export const Help = () => {
  const modalContent = `
🚨 **Problèmes techniques en cours...**  
Le service qui héberge les serveurs du site rencontre une **panne importante**. Résultat : le site est **lent, instable ou carrément inaccessible**.  
Et pour être honnête... ça me **gave**.

💸 Je ne gagne absolument **rien** avec ce projet.  
C’est juste un petit site passion, mais en ce moment j’ai vraiment du mal à savoir si je dois continuer ou tout arrêter.  
Entre les pannes à répétition et l’absence de revenus, la motivation prend un coup...

---

🎢 **Mais bon, si t’es là, c’est que le site t’intéresse un peu ?**  
Si tu veux me donner un coup de pouce, moral ou financier, tu peux faire un don —  
même symbolique — pour soutenir le projet (et peut-être me redonner un peu de foi 😅).

❤️ Merci à celles et ceux qui ont déjà soutenu, ça compte énormément.  
[💙 Faire un don sur Ko-fi](https://ko-fi.com/N4N51BO1FI)
`;

  return (
    <div className="modali">
      <div className="modal-contenti">
        <ReactMarkdown>{modalContent}</ReactMarkdown>
        <a
          href="https://ko-fi.com/N4N51BO1FI"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            height="36"
            style={{ border: "0px", height: "36px" }}
            src="https://storage.ko-fi.com/cdn/kofi6.png?v=6"
            alt="Buy Me a Coffee at ko-fi.com"
          />
        </a>
      </div>
    </div>
  );
};
