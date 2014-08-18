describe('myApp.js', function() {
	var scope, controller, service;
	var $q;
	var deferred, promise;
	
	beforeEach(function() {
		module('myApp');
		
		inject(function(_$q_, $rootScope, $controller, _myService_) {
			$q = _$q_;
			scope = $rootScope.$new();
			service = _myService_;
			controller = $controller('myController', {$scope: scope, myService: service});
			
			deferred = $q.defer();
			promise = deferred.promise;
		});
	});
			
	
	describe('test deferred and promise', function() {
		it('should call all 3 tasks', function() {
			deferred.resolve("deferred success");
			spyOn(service, 'task1').and.returnValue(promise);
			spyOn(service, 'task2').and.returnValue(promise);
			spyOn(service, 'task3');
			
			scope.doTasks();
			
			expect(service.task1).toHaveBeenCalled();
			expect(service.task2).not.toHaveBeenCalled();
			expect(service.task3).not.toHaveBeenCalled();
			
			scope.$digest();
			
			expect(service.task2).toHaveBeenCalled();
			expect(service.task3).toHaveBeenCalled();
		});
		
		it('should call task1 only', function() {
			deferred.reject("deferred rejected");
			spyOn(service, 'task1').and.returnValue(promise);
			spyOn(service, 'task2').and.returnValue(promise);
			spyOn(service, 'task3');
			
			scope.doTasks();
			
			expect(service.task1).toHaveBeenCalled();
			expect(service.task2).not.toHaveBeenCalled();
			expect(service.task3).not.toHaveBeenCalled();
			
			scope.$digest();
			
			expect(service.task2).not.toHaveBeenCalled();
			expect(service.task3).not.toHaveBeenCalled();
		});
	});
});
