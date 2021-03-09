import { TTone } from '../types/TTone';

export interface IMessage {
  id: string
  // Основной тип: СМИ | СОЦМЕДИА
  typeId: string
  // Человекопонятный индентификатор типа, используется в переключателе
  typeSlug: string
  typeName: string
  date: string
  // Отметка "Требуется реакция"
  needReaction: boolean
  // Отметить двойной галочкой // Завершенное?
  isCompleted: boolean
  // Звёздочка, Добавлено в избранное
  isFavorited: boolean
  // Есть Корзина где можно посмотреть удалённые сообщения
  isDeleted: boolean
  title: string
  // Кратная аннотация
  annotation: string,
  // Полное содержание статьи
  text: string,
  /*
    Далее показатели, там есть стрелочки, растёт или падает,
    поэтому нужно предбудущее значение
  */
  // Показатель MFI предыдущее значение
  mfiPrevValue: number
  // Показатель MFI текущее значение
  mfiValue: number
  // Показатель ER предыдущее значение
  erPrevValue: number
  // Показатель ER предыдущее значение
  erValue: number
  /*
    Помнишь про тональность поднимал вопрос где будут эмоджи?
    Нужно решить, бекенд будет их отдавать или во фронтенд зашиваем.
  */
  tone: TTone
  sourceId: string
  sourceName: string
  // Ссылка на источник
  sourceLink: string
  // Это город источника или статьи? Если источника, то лучше sourceCityId
  cityId: string
  // Это город источника или статьи? Если источника, то лучше sourceNameId
  cityName: string
  /*
    У сообщений есть картинка, пока не ясно, это картинка статьи или источника
    похоже что источника
  */
  // Аватар источника // avatar, если статьи
  sourceAvatar: string
  // У сообщений есть иконка тегов, но в макете не раскрыто их использование
  tags: []
}
