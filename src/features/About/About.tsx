import { FC } from 'react';
import styled from 'styled-components';

export const About: FC = () => {
  return (
    <SWrap>
      <SBlock>
        <h3>О проекте</h3>
        <p>
          Данный проект предназначен для демонстрации навыков разработки на
          react и сопутствующих технологиях
        </p>
      </SBlock>

      <SBlock>
        <h3>ЗАМЕЧАНИЯ ПО ДОБАВЛЕНИЮ НОВОГО СОБЫТИЯ</h3>
        <p>
          ЕСЛИ В ТЕЧЕНИИ ЧАСА, НА КТОРЫЙ ВЫ ДОБАВЛЯЕТЕ СОБЫТИЕ, УЖЕ ЕСТЬ ЕЩЕ
          ОДНО СОБЫТИЕ, ТО ВРЕМЯ БУДЕТ СЧИТАТЬСЯ ЗАНЯТЫМ И ВЫ ПОЛУЧИТЕ ОШИБКУ
          {' "'}TIME IS BUSY{'"'}
        </p>
      </SBlock>

      <SBlock>
        <h3>Стек</h3>
        <p>
          typescript, react, redux-toolkit, date-fns, styled-components, docker,
          eslint, prettier
        </p>
      </SBlock>

      <SBlock>
        <h3>Сведения о разработчике</h3>
        <p>
          Меня зовут Василий. Я разработчик js. Специализируюсь на стеке
          typescript, react, redux-toolkit и фронтент разработке, но не
          ограничен данными технологиями ))
        </p>
      </SBlock>

      <SBlock>
        <h3>github</h3>
        <a href="https://github.com/horhoj">https://github.com/horhoj</a>
      </SBlock>

      <SBlock>
        <h3>Telegram</h3>
        <a href="https://t.me/sarevok_horhoj">https://t.me/sarevok_horhoj</a>
      </SBlock>
    </SWrap>
  );
};

const SWrap = styled.div`
  padding: 10px;
  margin: 0 auto;
  max-width: 740px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
