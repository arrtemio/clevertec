import React from 'react';
import { Link } from 'react-router-dom';

import styles from './footer.module.scss';

import facebook from '../../static/assets/icons/facebook.svg';
import inst from '../../static/assets/icons/inst.svg'
import vk from '../../static/assets/icons/vk.svg'
import linkedin from '../../static/assets/icons/linkedin.svg'

export const Footer = () => (
    <footer className={styles.footer}>
      <div className={styles.footer__text}>
        © 2020-2023 Cleverland. Все права защищены.
      </div>
        <div className={styles.footer__icons}>
          <Link to='/'>
            <img src={facebook} alt='Facebook' />
          </Link>
          <Link to='/'>
            <img src={inst} alt='Instagram' />
          </Link>
          <Link to='/'>
            <img src={vk} alt='VK' />
          </Link>
          <Link to='/'>
            <img src={linkedin} alt='LinkedIn' />
          </Link>
        </div>
    </footer>
);


