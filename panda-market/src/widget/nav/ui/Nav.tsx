import { LargeLogo, UserProfile } from '@/shared/ui';

import * as S from './Nav.style';
import largeLogo1x from '@/shared/assets/images/logos/main_logo@1x.png';
import Link from 'next/link';

export const Nav = () => {
  return (
    <S.Wrapper>
      <LargeLogo logoImage={largeLogo1x} />
      <S.Categories>
        <Link href="/boards">
          <S.CategoryItem>자유게시판</S.CategoryItem>
        </Link>
        <Link href="/items">
          <S.CategoryItem>중고마켓</S.CategoryItem>
        </Link>
      </S.Categories>
      <S.UserProfile>
        <UserProfile />
      </S.UserProfile>
    </S.Wrapper>
  );
};