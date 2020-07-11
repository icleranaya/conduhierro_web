import { style, query, group, trigger, animate, keyframes, transition, animateChild } from '@angular/animations';

export const fader = trigger('routeAnimations', [
	transition('* <=> *', [
		style({ position: 'relative' }),
		query(
			':enter, :leave',
			[
				style({
					opacity: 0
				})
			],
			{ optional: true }
		),
		query(':enter', [ animate('700ms ease-out', style({ opacity: 1 })) ], { optional: true })
	])
]);

export const slider = trigger('routeAnimations', [
	transition('Home => *', slideTo('right')),
	transition('* => Home', slideTo('left')),
	transition('Servicios => *', slideTo('right')),
	transition('Nosotros => *', slideTo('right')),
	transition('Hacemos => *', slideTo('right')),
	transition('Portafolio => *', slideTo('right')),
	transition('Producto => *', slideTo('right')),
	transition('Contacto => *', slideTo('left')),
	transition('* => Login', slideTo('bottom'))
]);

function slideTo(direction) {
	const optional = { optional: true };

	return [
		query(
			':enter, :leave',
			[
				style({
					position: 'absolute',
					top: 0,
					bottom: 0,
					opacity: 0,
					[direction]: 0,
					width: '100%'
				})
			],
			optional
		),
		query(
			':enter',
			[
				style({
					opacity: 0,
					[direction]: '-100%'
				})
			],
			optional
		),
		group([
			query(
				':leave',
				[
					animate(
						'700ms ease-in-out',
						style({
							opacity: 0,
							[direction]: '100%'
						})
					)
				],
				optional
			),
			query(
				':enter',
				[
					animate(
						'700ms ease-in-out',
						style({
							opacity: 1,
							[direction]: '0%'
						})
					)
				],
				optional
			)
		])
	];
}
