# landing-nothing

Лабораторна робота №10 · **Варіант 2: Nothing · BEM + ITCSS**
Макет: Figma, сторінка `v2 Nothing` · Демо: `https://<user>.github.io/landing-nothing/`

## Команди

```bash
npm install
npm run dev       # dev-сервер (спершу генерує зображення)
npm run build     # збірка у dist/
npm run preview
npm run lint      # Stylelint + prettier --check
npm run format
npm run images    # AVIF + WebP + JPEG у кількох ширинах → public/img
```

Для GitHub Pages збірка йде через `.github/workflows/deploy.yml` (`BASE_PATH=/<repo>/`).

## Декомпозиція на BEM-блоки

| Блок                                                   | Елементи / модифікатори                                                           | Де використано                                     |
| ------------------------------------------------------ | --------------------------------------------------------------------------------- | -------------------------------------------------- |
| `c-header`                                             | `__inner`, `__logo`, `__phone`, `__phone-number`, `__burger`, `__icon`            | шапка (hover телефону показує номер)               |
| `c-burger`                                             | `__line--top/mid/bottom`                                                          | іконка бургера, hover = скорочені лінії            |
| `c-menu`                                               | `__bar`, `__close`, `__nav`, `__list`, `__link`, `__contact`, `__phone`, `__call` | меню-оверлей (CSS-only, checkbox)                  |
| `c-hero`                                               | `__picture`, `__image`, `__content`, `__title`                                    | hero                                               |
| `c-section-title`                                      | —                                                                                 | усі заголовки h2                                   |
| `c-product-card`                                       | `__media`, `__image`, `__title`, `__text`, `__price`                              | Recommended (міксується з `c-recommended__item`)   |
| `c-category`                                           | `__media`, `__media--wide`, `__image`, `__title`                                  | рядок галереї                                      |
| `c-button`                                             | —                                                                                 | View all, Send (default / hover / :active)         |
| `c-banner`                                             | `__picture`, `__image`                                                            | темний текстурний банер                            |
| `c-about`, `c-contacts`, `c-info`, `c-form`, `c-field` | `c-field__control--textarea`                                                      | About us, Contact us                               |
| `c-recommended`, `c-categories`                        | `__title`, `__item`, `__more`                                                     | «батьки»: ставлять дітей по колонках сітки (міксі) |

Об'єкти (`o-`): `o-container`, `o-grid` (+`--debug`), `o-section` (`--flush`, `--after-hero`). Утиліти (`u-`): `u-visually-hidden`.

## Архітектура стилів (ITCSS)

```
src/styles/
├── 1-settings/   токени: брейкпоінти, сітка, кольори, шрифти (SCSS-map)
├── 2-tools/      міксин mq() (mobile first, min-width)
├── 3-generic/    reset + :root з CSS custom properties (з SCSS-токенів)
├── 4-elements/   html, body, h1–h3, a — без класів
├── 5-objects/    o-container, o-grid, o-section — структура без оформлення
├── 6-components/ один BEM-блок = один partial
├── 7-utilities/  u-visually-hidden (єдине місце з !important)
└── main.scss     підключення строго 1 → 7
```

Іменування: `o-|c-|u-` + BEM (`c-product-card__title`, `c-field__control--textarea`), перевіряється `selector-class-pattern` у Stylelint. Специфічність зростає зверху вниз («перевернутий трикутник»): generic → елементи → класи об'єктів/компонентів → утиліти. `!important` дозволено лише в `7-utilities` (override у `.stylelintrc.json`). Зовнішні відступи й позиціонування блоків задають батьківські блоки через міксі (`c-product-card c-recommended__item`).

## Сітка

| Ширина | Колонки | Колонка | Gutter | Margin             |
| ------ | ------- | ------- | ------ | ------------------ |
| 320    | 2       | 130     | 20     | 20                 |
| 744    | 6       | 80      | 24     | 72                 |
| 1260   | 12      | 63      | 24     | 120 (контент 1020) |

`.o-grid` = `display: grid; grid-template-columns: repeat(var(--grid-columns), minmax(0, 1fr))`; значення змінюються в `:root` через `mq()`. Галерея категорій — `subgrid`: широке/вузьке зображення займає 1+1 / 4+2 / 8+4 колонок. Для звірки додайте `o-grid--debug`.

## Без JavaScript

Меню: `input[type=checkbox]` + `label`. Обмеження: немає закриття по `Esc`, label не є кнопкою для скрінрідерів (тому є прихований текст і `aria-label` на checkbox), фокус лишається на checkbox.

## Скриншоти

PerfectPixel 320 / 744 / 1260 — _додати_ · W3C Validator — _додати_ · PageSpeed Mobile/Desktop — _додати_
