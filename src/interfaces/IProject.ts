export interface IProject {
  id: string
  // Имя проекта
  name: string
  // Тип проекта: активный или архивированный
  type: 'active' | 'archived',
  // Тип проекта: активный или архивированный
  isActive: boolean,
  // Дата начала сбора данных
  startDate: string
  // Создатель проекта
  cteator: string,
  // Последний обновивщий проект
  lastUpdateUser: string,
  // Дата последнего обновления проекта
  lastUpdateDate: string,
  messageStat: any
}
