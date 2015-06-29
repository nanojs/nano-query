/*
 *  nano Query plugin v1.0
 *  http://nanojs.org/plugins/query
 *
 *  Copyright (c) 2008-2015 James Watts
 *  https://github.com/jameswatts
 *
 *  This is FREE software, licensed under the GPL
 *  http://www.gnu.org/licenses/gpl.html
 */

if (nano) {
	nano.plugin({
		query: function _query(query) {
			return nano.query(query, this.node);
		}
	}, function() {
		this.query = function _query(query, node) {
			if (typeof Sizzle === 'function') {
				var nodes = new Sizzle((typeof query === 'string')? query : '*', (node)? ((node.nano)? node.node : node) : null);
				for (var i = 0; i < nodes.length; i++) nodes[i] = nano(nodes[i]);
				nodes.val = query;
				nodes.add = function _add(obj) {
					if (typeof obj === 'string') {
						var nodes = new Sizzle((typeof query === 'string')? query : '*');
						for (var i = 0; i < nodes.length; i++) this.push(nano(nodes[i]));
					} else if (nano.type(obj) === 'array') {
						for (var i = 0; i < obj.length; i++) this.nodes.push((obj[i].nano)? obj[i] : nano(obj[i]));
					} else {
						this.push((obj.nano)? obj : nano(obj));
					}
					return this;
				};
				nodes.each = function _each(fn, exit) {
					if (typeof fn === 'function') {
						var exit = (arguments.length < 2)? null : exit,
							i, out;
						for (i = 0; i < this.length; i++) {
							out = fn.call(this[i], this, i);
							if (out === exit) break;
						}
					}
					return this;
				};
				nodes.first = function _first() {
					return (this.length > 0)? this[0] : null;
				};
				nodes.last = function _last() {
					return (this.length > 0)? this[this.length - 1] : null;
				};
				return nodes;
			}
			return null;
		};
	});
}
