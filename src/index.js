const mainEl = document.getElementById('main');

class Character {
  constructor(props) {
    this._Name = props.name;
    this._HP = props.hp;
    this._initialHP = props.initialHP;
    this._MP = props.mp;
    this._initialMP = props.initialMP;
    this._offensePower = props.offensePower;
    this._defencePower = props.defencePower;
  }

  showStatus() {
    /*
      キャラクターの名前、HP、MPを表示する。
    */
   mainEl.innerHTML = `
    <div>
      <p><b>名前: </b>${this._Name}</p>
      <p><b>HP: </b>${this._HP}</p>
      <p><b>MP: </b>${this._MP}</p>
    </div>
   `
  }

  attack(defender) {
    /*
      キャラクターが死んでいる場合は攻撃出来ないので、それを表示する。
      死んでいない場合は相手に与えたダメージを表示。
      相手が死んだ場合は相手に与えたダメージと死んだことを表示する。
    */
   if (defender._HP <= 0) {
     mainEl.innerText = `${defender._Name}は故人です。攻撃できません。`;
   } else {
     const damage = this.calcAttackDamage();
     mainEl.innerText = `${defender._Name}に。${damage}のダメージ！`;
     if (this._HP <= damage) {
      mainEl.innerText = `${defender._Name}は天に召されました。`;
     }
   }
  //  プロパティの値の変え方は？
  }

  calcAttackDamage(defender) {
    /*
      ダメージは単純に攻撃力から防御力を引いて計算する。
      ダメージが0未満の場合は、最低のダメージ1を与える。
    */
   const damage = this._offensePower - defender._defencePower;
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
    if (this._HP <= 0) {
      mainEl.innerText = `${this._Name}は死亡しています。`;
    } else if (target._HP <= 0) {
      mainEl.innerText = `${target._Name}は既に死亡しています。回復できません。`;
    } else if (this._MP < 3) {
      mainEl.innerText = 'MPが足りません。';
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
