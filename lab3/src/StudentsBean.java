import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import java.io.Serializable;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.List;

@ManagedBean(eager = true)
@ApplicationScoped
public class StudentsBean implements Serializable {
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

    public void addToList(){
        int resultt = 0;
        /*try{
            Connection con = getConnection();
            double xx = discryptX(enterX);
            double yy = Double.parseDouble(enterY);
            if(enterR.equals("")) return "";
            int rr = Integer.parseInt(enterR);
            PreparedStatement stmt = connection.prepareStatement(
                    "INSERT INTO hit_to_graph(user_id, x, y, r, answer) values(1, ?, ?, ?, ?)");
            stmt.setDouble(1, xx);
            stmt.setDouble(2, yy);
            stmt.setInt(3, rr);
            stmt.setBoolean(4, checkArea(xx, yy, rr));
            resultt = stmt.executeUpdate();

            connection.close();
        }catch(Exception e){
            System.out.println(e);
        }
        */
        //return "view/main.xhtml?faces-redirect=true";
    }

    public Connection getConnection() {
        final String URL = "jdbc:oracle:thin:@//localhost:1521/orcl";
        final String LOGIN = "system";
        final String PASSWORD = "oracle";
        Connection connection = null;
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            connection = DriverManager.getConnection(URL, LOGIN, PASSWORD);
        } catch (Exception e) {
            System.out.println(e);
        }
        return connection;
    }

    public void clearList(){

    }


    public List<StudentsBean> getHitsList(){
        List<StudentsBean> list = new ArrayList<StudentsBean>();
        return list;
    }
}
