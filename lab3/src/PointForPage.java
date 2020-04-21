import jdk.nashorn.internal.objects.annotations.Property;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import java.io.Serializable;
import java.sql.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@ManagedBean(eager = true)
@ApplicationScoped
public class PointForPage implements Serializable {
    private String valueX;
    private String canvasX;
    private String valueY;
    private String canvasY;
    private String valueR;

    public String getValueX() {
        return valueX;
    }

    public String getValueY() {
        return valueY;
    }

    public String getValueR() {
        return valueR;
    }

    public String getCanvasX() {
        return canvasX;
    }

    public String getCanvasY() {
        return canvasY;
    }

    public void setValueX(String valueX) {
        this.valueX = valueX;
    }

    public void setValueY(String valueY) {
        this.valueY = valueY;
    }

    public void setValueR(String valueR) {
        this.valueR = valueR;
    }

    public void setCanvasX(String canvasX) {
        this.canvasX = canvasX;
    }

    public void setCanvasY(String canvasY) {
        this.canvasY = canvasY;
    }

    private Connection con;

    public PointForPage() {
        valueX = "-5";
        valueY = "-3";
        valueR = "1";
        try {
            con = getConnection();
        } catch (SQLException | ClassNotFoundException e) {
            System.out.println(Arrays.toString(e.getStackTrace()));
        }
    }

    public void addToList() {
            double x = Double.parseDouble(valueX);
            double y = Double.parseDouble(valueY);
            int r = Integer.parseInt(valueR);
            addToDataBase(x, y, r);
    }

    private void addToDataBase(double x, double y, int r){
        try (PreparedStatement stmt = con.prepareStatement(
                "INSERT INTO points(x, y, r, answer, id) values(?, ?, ?, ?, POINTS_SEQUENCE.nextval)")) {
            boolean answer = checkArea(x, y, r);
            stmt.setDouble(1, x);
            stmt.setDouble(2, y);
            stmt.setInt(3, r);
            stmt.setBoolean(4, answer);
            stmt.executeUpdate();
        } catch (SQLException e) {
            System.out.println(Arrays.toString(e.getStackTrace()));
        }
    }

    public void addToListFromCanvas() {
            double x = Double.parseDouble(canvasX);
            double y = Double.parseDouble(canvasY);
            int r = Integer.parseInt(valueR);
            addToDataBase(x, y, r);
    }

    private boolean checkArea(double x, double y, int r) {
        return (((x >= -r / 2.0 && x <= 0 && y <= r && y >= 0)
                || (y >= -(x + r) && y <= 0 && x <= 0)
                || ((x * x + y * y) <= r * r / 4.0 && x >= 0 && y <= 0)));
    }

    private Connection getConnection() throws SQLException, ClassNotFoundException {
        final String URL = "jdbc:oracle:thin:@//localhost:1521/orbis";
        final String LOGIN = "s264434";
        final String PASSWORD = "******";
        Connection con;
        Class.forName("oracle.jdbc.driver.OracleDriver");
        con = DriverManager.getConnection(URL, LOGIN, PASSWORD);
        con.setAutoCommit(true);
        return con;
    }

    public List<Point> getPointsList() {
        List<Point> list;
        list = new ArrayList<>();
        try (PreparedStatement stmt = con
                .prepareStatement("select x, y, r, answer from POINTS order by ID");
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                Point newPoint = new Point();
                newPoint.setX(rs.getDouble("x"));
                newPoint.setY(rs.getDouble("y"));
                newPoint.setR(rs.getInt("r"));
                newPoint.setAnswer(rs.getBoolean("answer"));
                list.add(newPoint);
            }
            return list;
        } catch (SQLException e) {
            System.out.println(Arrays.toString(e.getStackTrace()));
            return new ArrayList<>();
        }
    }
}
