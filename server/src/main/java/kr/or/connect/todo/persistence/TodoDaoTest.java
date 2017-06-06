package kr.or.connect.todo.persistence;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.junit.Assert.assertThat;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class TodoDaoTest {
	@Autowired
	private TodoDao dao;
	//long date = new Date().getTime();
	Date d = new Date();
	Timestamp timestamp = new Timestamp(d.getTime());
	Timestamp date = timestamp;
	
	@Test
	public void shouldCount() {
		int count = dao.countTodos();
		System.out.println(count);
	}
	
	@Test
	public void shouldInsertAndSelect() {
		// given
		//Todo todo = new Todo("go to school",0, new Timestamp(new Date().getTime()));
		Todo todo = new Todo("go to school",0,date);
		// when
		Integer id = dao.insert(todo);

		// then
		Todo selected = dao.selectById(id);
		System.out.println(selected);
		assertThat(selected.getTodo(), is("go to school"));
	}
	
	@Test
	public void shouldDelete() {
		// given
		Todo todo = new Todo("go to school",0,date);
		//Todo todo = new Todo("read a book",0,date);
		Integer id = dao.insert(todo);

		// when
		int affected = dao.deleteById(id);

		// Then
		assertThat(affected, is(1));
	}
	
	
	@Test
	public void shouldUpdate() {
		// Given
		//Todo todo = new Todo("read a book",0,date);
		Todo todo = new Todo("go to school",0,date);
		Integer id = dao.insert(todo);

		// When
		todo.setId(id);
		todo.setTodo("read a book");
		int affected = dao.update(todo);

		// Then
		assertThat(affected, is(1));
		Todo updated = dao.selectById(id);
		assertThat(updated.getTodo(), is("read a book"));
	}
	
	@Test
	public void shouldSelectAll() {
		List<Todo> allBooks = dao.selectAll();
		assertThat(allBooks, is(notNullValue()));
	}
}
