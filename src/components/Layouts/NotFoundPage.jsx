import style from "./NotFoundPage.module.css";
import image from "./404.png"

export default function NotFoundPage() {
  return (<>
    <h2 className={style.title}>404 Page not found</h2>
    <img
      src={image}
      alt="Page not found"
      width="400" height="auto"
      className={style.image}
    />
    <p className={style.description}>
      Congratulations! You've found this page.
      <br />
      A real achievement, considering that the site didn't.
      </p>
  </> 
  );
}