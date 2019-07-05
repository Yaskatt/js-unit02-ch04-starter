const mainEl = document.getElementById('main');

class Character {
  constructor(props) {
    this.name = props.name;
    this.hp = props.hp;
    this.mp = props.mp;
    this.offensePower = props.offensePower;
    this.defencePower = props.defencePower;
  }

  showStatus() {
    /*
      キャラクターの名前、HP、MPを表示する。
    */
    const div = document.createElement('div');
    div.innerHTML = `
      <p><b>名前: </b>${this.name}</p>
      <p><b>HP: </b>${this.hp}</p>
      <p><b>MP: </b>${this.mp}</p>
   `
    mainEl.appendChild(div);
  }

  attack(defender) {
    /*
      キャラクターが死んでいる場合は攻撃出来ないので、それを表示する。
      死んでいない場合は相手に与えたダメージを表示。
      相手が死んだ場合は相手に与えたダメージと死んだことを表示する。
    */
    const div = document.createElement('div');
    if (this.hp <= 0) {
      div.innerHTML = `<p>${this.name}は故人です。攻撃できません。</p>`;
      mainEl.appendChild(div);

      return;
    }
    if (defender.hp <= 0) {
      div.innerHTML = `<p>${defender.name}は既に死亡しています。攻撃できません。</p>`;
      mainEl.appendChild(div);

    } else {
      const damage = this.calcAttackDamage(defender);
      div.innerHTML = `<p>${defender.name}に${damage}のダメージ！</p>`;
      mainEl.appendChild(div);

      if (defender.hp <= damage) {
        div.innerHTML = `<p>${defender.name}に${damage}のダメージ！${defender.name}は天に召されました。</p>`;
        mainEl.appendChild(div);

      }
      defender.hp -= damage;
    }
  }

  calcAttackDamage(defender) {
    /*
      ダメージは単純に攻撃力から防御力を引いて計算する。
      ダメージが0未満の場合は、最低のダメージ1を与える。
    */
    const damage = this.offensePower - defender.defencePower;
    if (damage <= 0) {
      return 1;
    } else {
      return damage;
    }
  }
}

class Sorcerer extends Character {
  constructor(props) {
    super(props);
  }

  healSpell(target) {
    /*
      回復魔法は3のMPを消費する。
      相手のHPを15回復する。
      魔法使いが死んでいる場合はその旨を表示する。
      相手が死んでいる場合は回復が出来ないためその旨を表示する。
      MPが足りない場合はその旨を表示する。
    */
    const div = document.createElement('div');

    if (this.hp <= 0) {
      div.innerHTML = `<p>${this.name}は故人です。動きません。</p>`;
      mainEl.appendChild(div);

      return;
    }
    if (target.hp <= 0) {
      div.innerHTML = `<p>${target.name}は既に死亡しています。回復できません。</p>`;
      mainEl.appendChild(div);

    } else if (this.mp < 3) {
      div.innerHTML = '<p>MPが足りません。healできません。</p>';
      mainEl.appendChild(div);

    } else {
      this.mp -= 3;
      target.hp += 15;
      div.innerHTML = `<p>${target.name}のHPを15回復！</p>`;
      mainEl.appendChild(div);

    }
  }

  fireSpell(target) {
    /*
      攻撃魔法は2のMPを消費する。
      相手に10のダメージを与える。
      魔法使いが死んでいる場合はその旨を表示する。
      相手が死んでいる場合は攻撃が出来ないためその旨を表示する。
      MPが足りない場合はその旨を表示する。
    */
    const div = document.createElement('div');

    if (this.hp <= 0) {
      div.innerHTML = `<p>${this.name}は死人です。動きません。</p>`;
      mainEl.appendChild(div);

      return;
    }
    if (target.hp <= 0) {
      div.innerHTML = `<p>${target.name}は既に死亡しています。攻撃できません。</p>`;
      mainEl.appendChild(div);

    } else if (this.mp < 2) {
      div.innerHTML = '<p>MPが足りません。fireできません。</p>';
      mainEl.appendChild(div);

    } else {
      div.innerHTML = `<p>${target.name}に10のダメージ！</p>`;
      mainEl.appendChild(div);

      if (target.hp <= 10) {
        mainEl.innerHTML = `<p>${target.name}に10のダメージ！${target.name}は亡くなりました。</p>`;
        mainEl.appendChild(div);

      }
      this.mp -= 2;
      target.hp -= 10;
    }
  }
}

{
  const fighter = new Character({
    name: '武道家',
    hp: 40,
    mp: 0,
    offensePower: 15,
    defencePower: 10
  })
  const sorcerer = new Sorcerer({
    name: '魔法使い',
    hp: 25,
    mp: 10,
    offensePower: 8,
    defencePower: 10
  })
  const monster = new Character({
    name: 'モンスター',
    hp: 60,
    mp: 0,
    offensePower: 30,
    defencePower: 10
  })

  fighter.attack(monster);
  sorcerer.attack(monster);
  monster.attack(sorcerer);
  fighter.attack(monster);
  sorcerer.healSpell(sorcerer);
  monster.attack(fighter);
  fighter.attack(monster);
  sorcerer.fireSpell(monster);
  monster.attack(fighter);
  fighter.showStatus();
  sorcerer.showStatus();
  monster.showStatus();
}
