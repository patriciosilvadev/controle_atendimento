/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
	'use strict';
	angular.module('BlurAdmin').service('Session', function () {
		this.create = function (id, tipo,email,username,token,nome) {
			this.id = id;
			this.tipo = tipo;
			this.email=email;
			this.username=username;
			this.token=token;
			this.nome=nome;
		};
		this.destroy = function () {
			this.null = null;
			this.tipo = null;
			this.email=null;
			this.username=null;
			this.token=null;
			this.nome=null;
		};
	});
})();