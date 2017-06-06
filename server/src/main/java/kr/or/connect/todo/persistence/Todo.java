package kr.or.connect.todo.persistence;


import java.sql.Timestamp;
import java.util.Date;

public class Todo {
	private Integer id;
	private String todo;
	private int completed;
	private Timestamp date;


	public Todo(){
	}

	public Todo(String todo, int completed, Timestamp date) {
		this.todo = todo;
		this.completed = completed;
		this.date = date;
	}

	public Todo(Integer id, String todo, int completed, Timestamp date) {
		this(todo, completed, date);
		this.id = id;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	@Override
	public String toString() {
		return "Todo [id=" + id + ", todo=" + todo + ", completed=" + completed + ", date=" + date + "]";
	}

	public String getTodo() {
		return todo;
	}

	public void setTodo(String todo) {
		this.todo = todo;
	}

	public int getCompleted() {
		return completed;
	}

	public void setCompleted(int completed) {
		this.completed = completed;
	}
	
	public Timestamp getDate() {
		return date;
	}

	public void setDate(Timestamp date) {
		this.date = date;
	}
	
	
	
}
