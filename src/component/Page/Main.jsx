import React from 'react';
import { Tracks } from '../Main/Tracks';
import { Albums } from '../Main/Albums';
import { Register } from '../Authorization/Register';
import { Login } from '../Authorization/Login';
import { Header } from '../Header';

export function Main() {
  return (
    <main>
      <div class='container'>
        <Albums />
        <Tracks />
      </div>
    </main>
  );
}
