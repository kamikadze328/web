import javax.faces.bean.ManagedProperty;
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
    private String valueY;
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


    public void setValueX(String valueX) {
        this.valueX = valueX;
    }

    public void setValueY(String valueY) {
        this.valueY = valueY;
    }

    public void setValueR(String valueR) {
        this.valueR = valueR;
    }

    private Connection con;
    private int count;


    public PointForPage() {
        valueX = "-5";
        valueY = "-3";
        valueR = "1";
        count = 0;
        try {
            con = getConnection();
        } catch (SQLException | ClassNotFoundException e) {
            System.out.println(Arrays.toString(e.getStackTrace()));
        }
    }

    public void addToList() {
        try (PreparedStatement stmt = con.prepareStatement(
                "INSERT INTO points(x, y, r, answer) values(?, ?, ?, ?)")) {
            double x = Double.parseDouble(valueX);
            double y = Double.parseDouble(valueY);
            int r = Integer.parseInt(valueR);
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

    private boolean checkArea(double x, double y, int r) {
        return (((x >= -r / 2.0 && x <= 0 && y <= r && y >= 0)
                || (y >= -(x + r) && y <= 0 && x <= 0)
                || ((x * x + y * y) <= r * r / 4.0 && x >= 0 && y <= 0)));
    }

    private Connection getConnection() throws SQLException, ClassNotFoundException {
        final String URL = "jdbc:oracle:thin:@//localhost:1521/orcl";
        final String LOGIN = "system";
        final String PASSWORD = "oracle";
        Connection con;
        Class.forName("oracle.jdbc.driver.OracleDriver");
        con = DriverManager.getConnection(URL, LOGIN, PASSWORD);
        con.setAutoCommit(true);
        return con;

    }

    public void clearList() {
        try (PreparedStatement stmt = con
                .prepareStatement("Delete from POINTS where *");
             ResultSet rs = stmt.executeQuery()) {
        } catch (SQLException e) {
            System.out.println(Arrays.toString(e.getStackTrace()));
        }
    }

    public List<Point> getPointsList() {
        List<Point> list;
        list = new ArrayList<>();
        count++;
        try (PreparedStatement stmt = con
                .prepareStatement("select x, y, r, answer from POINTS");
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
