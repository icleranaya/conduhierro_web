export class Post {
	// Default structure of DB
	published: string;
	id?: string;
	title: string;
	content: string;
	excerpt: string;
	image: string;
	state: string;
	nextpost: string;
	prevpost: string;
	slider: Array<string>;
}
