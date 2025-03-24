// BEM规范 block 代码块 element 元素 modifier 修饰符
// block__element--modifier -> yy-button__element--disabled

export class CreateNamespace {
	private _prefixName!: string

	get value() {
		const value = this._prefixName
		this._reset()
		return value
	}

	constructor(private name: string) {
		this._reset()
	}

	private _reset() {
		this._prefixName = `yy-${this.name}`
	}

	b(blockSuffix: string = '') {
		if (blockSuffix) {
			this._prefixName += `-${blockSuffix}`
		}

		return this
	}

	e(element: string | boolean = '') {
		if (!element) {
			this._prefixName = ''
			return this
		}

		this._prefixName += `__${element}`
		return this
	}

	m(modifier: string | boolean = '') {
		if (!modifier) {
			this._prefixName = ''
			return this
		}

		this._prefixName += `--${modifier}`
		return this
	}

	is(name: string, state?: boolean) {
		return state ? `is-${name}` : ''
	}
}

// const bem = new CreateNamespace('button')

// console.log('', bem.b('box').value)
// console.log('', bem.e().value)
// console.log('', bem.m('modifier').value)
// console.log('', bem.b('box').e('element').value)
// console.log('', bem.b('box').m('modifier').value)
// console.log('', bem.e('element').m('modifier').value)
// console.log('', bem.b('box').e('element').m('modifier').value)
// console.log('', bem.is('disabled', true))
